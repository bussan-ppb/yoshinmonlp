/**
 * form.js - フォームバリデーション
 * お問い合わせフォームの入力チェック
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    let isValid = true;

    // すべての必須フィールドをチェック
    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form__group');
      const errorEl = group?.querySelector('.form__error');

      if (!field.value.trim()) {
        // 空欄の場合：エラー表示
        group?.classList.add('has-error');
        if (errorEl) errorEl.textContent = 'この項目は必須です';
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        // メールアドレス形式チェック
        group?.classList.add('has-error');
        if (errorEl) errorEl.textContent = '正しいメールアドレスを入力してください';
        isValid = false;
      } else {
        // エラー解除
        group?.classList.remove('has-error');
      }
    });

    if (!isValid) {
      e.preventDefault();
    }
  });

  // リアルタイムバリデーション：入力時にエラーを解除
  form.querySelectorAll('.form__input, .form__textarea').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form__group');
      if (field.value.trim()) {
        group?.classList.remove('has-error');
      }
    });
  });

  /**
   * メールアドレスの簡易バリデーション
   * @param {string} email - チェック対象のメールアドレス
   * @returns {boolean} 有効な形式かどうか
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
