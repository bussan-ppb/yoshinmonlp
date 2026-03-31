/**
 * gallery.js - ギャラリー用スクリプト
 * ライトボックス（画像拡大表示）機能
 */

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  // --- ギャラリーアイテムのクリックで拡大表示 ---
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        // クリックされた画像のsrcをライトボックスに設定
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // --- 閉じるボタン ---
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // --- 背景クリックで閉じる ---
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // --- Escキーで閉じる ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /**
   * ライトボックスを閉じる
   */
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
