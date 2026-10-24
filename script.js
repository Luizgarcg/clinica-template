document.addEventListener("DOMContentLoaded", () => {
  // 1. Efeito na Navbar ao rolar a página
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Correção do Menu Hambúrguer Mobile
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("active"),
      );
      const icon = mobileMenuBtn.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Fecha o menu ao clicar em qualquer link interno
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      });
    });
  }

  // 3. Lógica do Carrossel Animado de Infraestrutura
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    dots.forEach((dot, i) =>
      dot.setAttribute("aria-current", i === currentSlide ? "true" : "false"),
    );
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetTimer();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetTimer();
      });
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function startTimer() {
      if (reduceMotion) return; // respeita quem desativou animações no sistema
      clearInterval(slideInterval); // evita dois timers ao mesmo tempo
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopTimer() {
      clearInterval(slideInterval);
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Pausa o carrossel ao passar o mouse ou focar com o teclado
    const carouselBox = document.querySelector(".carousel-container");
    if (carouselBox) {
      carouselBox.addEventListener("mouseenter", stopTimer);
      carouselBox.addEventListener("mouseleave", startTimer);
      carouselBox.addEventListener("focusin", stopTimer);
      carouselBox.addEventListener("focusout", startTimer);
    }

    showSlide(0);
    startTimer();
  }

  // 4. Lógica do FAQ (Accordion)
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((q) => q.setAttribute("aria-expanded", "false"));
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      faqQuestions.forEach((q) => {
        if (q !== question) {
          q.classList.remove("active");
          q.setAttribute("aria-expanded", "false");
          q.nextElementSibling.style.maxHeight = null;
        }
      });

      question.classList.toggle("active");
      question.setAttribute(
        "aria-expanded",
        question.classList.contains("active"),
      );
      const answer = question.nextElementSibling;
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // 5. Campo dinâmico de "Outros Procedimentos"
  const motivoSelect = document.getElementById("motivo-select");
  const outroContainer = document.getElementById("outro-container");
  const outroInput = document.getElementById("outro-procedimento");

  if (motivoSelect && outroContainer) {
    motivoSelect.addEventListener("change", (e) => {
      if (e.target.value === "Outros Procedimentos") {
        outroContainer.style.display = "block";
        outroInput.required = true;
      } else {
        outroContainer.style.display = "none";
        outroInput.required = false;
        outroInput.value = "";
      }
    });
  }

  // 6. Formulário de Captura de Lead (Envia diretamente para o WhatsApp automatizado)
  const leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      let motivo = motivoSelect.value;

      if (motivo === "Outros Procedimentos") {
        const outroTexto = outroInput.value;
        motivo = `Outros: ${outroTexto}`;
      }

      // Número oficial da clínica
      const numeroWhatsApp = "5583900000000";

      // Mensagem formatada pronta para o WhatsApp
      const mensagem = encodeURIComponent(
        `Olá! Gostaria de agendar / tirar dúvidas através do site.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Interesse:* ${motivo}`,
      );

      // Abre o WhatsApp com os dados pré-preenchidos
      window.open(
        `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`,
        "_blank",
      );
    });
  }

  // 6B. Catálogo de Procedimentos (abas + botão de interesse via WhatsApp)
  const catalogTabs = document.querySelectorAll(".catalog-tab");
  const catalogPanels = document.querySelectorAll(".catalog-panel");

  catalogTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;

      catalogTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      catalogPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === category);
      });
    });
  });

  const catalogButtons = document.querySelectorAll(".catalog-item-btn");
  const numeroWhatsAppCatalogo = "5583900000000";

  catalogButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.dataset.item;
      const mensagem = encodeURIComponent(
        `Olá! Vi o catálogo no site e tenho interesse em: *${item}*.\n\nGostaria de saber mais e verificar disponibilidade para avaliação.`,
      );
      window.open(
        `https://api.whatsapp.com/send?phone=${numeroWhatsAppCatalogo}&text=${mensagem}`,
        "_blank",
      );
    });
  });

  // 7. Efeito Reveal (Scroll Animation)
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);
  reveal();
});
