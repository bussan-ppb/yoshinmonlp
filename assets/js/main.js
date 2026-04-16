/**
 * main.js - 共通スクリプト
 * ヘッダーのスクロール制御、モバイルメニュー、スクロールアニメーション
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ヘッダーのスクロール時背景変更 ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      // 50px以上スクロールしたら背景を付ける
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    });
  }

  // --- モバイルメニューの開閉 ---
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open');
      // メニュー開放中はスクロールを無効化
      document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
    });

    // モバイルメニュー内のリンクをクリックしたらメニューを閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- スクロールアニメーション ---
  // IntersectionObserver: 要素が画面内に入ったかを監視するAPI
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 画面に入ったらis-visibleクラスを付与してアニメーション発火
            entry.target.classList.add('is-visible');
            // 一度表示したら監視を解除（パフォーマンス向上）
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // 要素が5%見えた時点でトリガー（ギャラリー等の縦長要素対策）
        threshold: 0.05,
        // 画面下端から-50px手前でトリガー
        rootMargin: '0px 0px -50px 0px'
      }
    );

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- 現在のページのナビリンクをハイライト ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === './')) {
      link.classList.add('is-active');
    }
  });
});
