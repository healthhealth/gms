/********************************************************
 * MENU MOBILE
 ********************************************************/
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/********************************************************
 * SCROLL SUAVE
 ********************************************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const nav = document.querySelector("nav");
        const offset = nav ? nav.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    }
  });
});

/********************************************************
 * CARD EXPANSÍVEL (Currículo)
 ********************************************************/
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector(".card-title");
  const content = card.querySelector(".card-content");
  const iframe = card.querySelector("#curriculo-iframe");

  if (title) {
    title.addEventListener("click", () => {
      card.classList.toggle("expanded");

      if (card.classList.contains("expanded")) {
        if (iframe && !iframe.contentWindow.document.body) {
          iframe.src = "https://clinical-pearl.vercel.app/";
        }

        // Ajuste para a altura do iframe
        setTimeout(() => {
          if (iframe && iframe.contentWindow.document.body) {
            iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight + 25}px`;
          }
        }, 500); // Aumentei o tempo para aguardar o iframe carregar

      }
    });
  }
});

/********************************************************
 * BOTÃO VOLTAR PARA O TOPO
 ********************************************************/
const backToTopButton = document.getElementById("back-to-top");

// Mostra o botão quando o usuário rola a página para baixo
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Faz a rolagem suave para o topo quando o botão é clicado
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


  document.getElementById("form-contato").addEventListener("submit", function (event) {
    event.preventDefault(); // Agora, impede o envio padrão

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    grecaptcha.enterprise.ready(function () {
      grecaptcha.enterprise.execute("6Le2OM0qAAAAAJRlPYGkAATZfpslntfiNaEMJezJ", { action: "submit" })
        .then(function (token) {
          document.getElementById("g-recaptcha-response").value = token;

          // Envia o formulário
          var form = event.target; // Referência ao formulário
          fetch(form.action, {
            method: "POST",
            body: new FormData(form),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro ao enviar o formulário.");
              }
              return response.text();
            })
            .then((data) => {
              alert("Mensagem enviada com sucesso!");
              form.reset();
            })
            .catch((error) => {
              alert("Houve um erro ao enviar a mensagem. Tente novamente.");
              console.error("Erro:", error);
            });
        })
        .catch(function (error) {
          console.error("Erro no reCAPTCHA:", error);
          alert("Erro na verificação. Tente novamente.");
        });
    });
  });


