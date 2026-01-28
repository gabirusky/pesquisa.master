// Banco Master Research Page - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initScrollReveal();
  initFloatingNav();
  initCollapsibles();
  initCharts();
});

// Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Floating Navigation
function initFloatingNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll on click
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active state on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });
}

// Collapsible Sections
function initCollapsibles() {
  const headers = document.querySelectorAll('.collapsible-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.collapse-icon');
      content.classList.toggle('open');
      if (icon) {
        icon.textContent = content.classList.contains('open') ? '−' : '+';
      }
    });
  });
}

// Number Counter Animation
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString('pt-BR');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Financial Charts - Banco Master Growth Data
function initCharts() {
  // Check if Chart.js is loaded and canvas elements exist
  if (typeof Chart === 'undefined') return;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return 'R$ ' + context.parsed.y.toLocaleString('pt-BR') + ' bi';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: function (value) {
            return 'R$ ' + value + ' bi';
          }
        },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      }
    }
  };

  // Chart 1: Ativos Totais (Total Assets)
  const ctxAtivos = document.getElementById('chartAtivos');
  if (ctxAtivos) {
    new Chart(ctxAtivos, {
      type: 'bar',
      data: {
        labels: ['Dez/2020', 'Dez/2021', 'Dez/2022', 'Dez/2023', 'Jun/2024'],
        datasets: [{
          data: [6.2, 10.5, 20.8, 36.8, 57.2],
          backgroundColor: [
            'rgba(139, 92, 246, 0.6)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(139, 92, 246, 0.9)',
            'rgba(239, 68, 68, 1)'
          ],
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: chartOptions
    });
  }

  // Chart 2: Captações (Deposits/Funding)
  const ctxCaptacoes = document.getElementById('chartCaptacoes');
  if (ctxCaptacoes) {
    new Chart(ctxCaptacoes, {
      type: 'line',
      data: {
        labels: ['Dez/2020', 'Dez/2021', 'Dez/2022', 'Dez/2023', 'Jun/2024'],
        datasets: [{
          data: [5.1, 9.0, 18.3, 32.6, 49.5],
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 8
        }]
      },
      options: chartOptions
    });
  }

  // Chart 3: Lucro Líquido (Net Profit) - in millions
  const ctxLucro = document.getElementById('chartLucro');
  if (ctxLucro) {
    const lucroOptions = JSON.parse(JSON.stringify(chartOptions));
    lucroOptions.scales.y.ticks.callback = function (value) {
      return 'R$ ' + value + ' mi';
    };
    lucroOptions.plugins.tooltip.callbacks = {
      label: function (context) {
        return 'R$ ' + context.parsed.y.toLocaleString('pt-BR') + ' milhões';
      }
    };

    new Chart(ctxLucro, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024*'],
        datasets: [{
          data: [70, 138, 211, 532, 433],
          backgroundColor: [
            'rgba(34, 197, 94, 0.6)',
            'rgba(34, 197, 94, 0.7)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(34, 197, 94, 0.9)',
            'rgba(234, 179, 8, 0.9)'
          ],
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: lucroOptions
    });
  }

  // Chart 4: Patrimônio Líquido (Net Equity)
  const ctxPatrimonio = document.getElementById('chartPatrimonio');
  if (ctxPatrimonio) {
    new Chart(ctxPatrimonio, {
      type: 'line',
      data: {
        labels: ['Jun/2022', 'Dez/2022', 'Jun/2023', 'Dez/2023', 'Jun/2024'],
        datasets: [{
          data: [1.2, 1.7, 2.2, 2.8, 4.6],
          borderColor: 'rgba(234, 179, 8, 1)',
          backgroundColor: 'rgba(234, 179, 8, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(234, 179, 8, 1)',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 8
        }]
      },
      options: chartOptions
    });
  }
}
