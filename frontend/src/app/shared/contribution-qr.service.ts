import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

interface StoredQr { dataUrl: string; fileName: string; }

@Injectable({ providedIn: 'root' })
export class ContributionQrService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'bayanova.prototype.contribution-qr';
  private readonly stored = this.readStored();
  private readonly qrUrlState = signal(this.stored?.dataUrl ?? '');
  private readonly fileNameState = signal(this.stored?.fileName ?? '');
  readonly qrUrl = this.qrUrlState.asReadonly();
  readonly fileName = this.fileNameState.asReadonly();

  async save(file: File): Promise<void> {
    if (!file.type.startsWith('image/')) throw new Error('Choose a PNG, JPG, or other image file.');
    if (file.size > 2 * 1024 * 1024) throw new Error('The QR image must be 2 MB or smaller.');
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('The QR image could not be read.'));
      reader.onerror = () => reject(new Error('The QR image could not be read.'));
      reader.readAsDataURL(file);
    });
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.storageKey, JSON.stringify({ dataUrl, fileName: file.name } satisfies StoredQr));
    this.qrUrlState.set(dataUrl);
    this.fileNameState.set(file.name);
  }

  private readStored(): StoredQr | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try { const value = localStorage.getItem(this.storageKey); return value ? JSON.parse(value) as StoredQr : null; } catch { return null; }
  }
}
