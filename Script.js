/* =====================================================
   WEBINAJA V2
   ===================================================== */


/* ================= CONFIG ================= */

const WHATSAPP_NUMBER = "6282130964048";


/* ================= WHATSAPP ================= */

function openWhatsApp(message) {

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}


/* ================= PACKAGE ================= */

let selectedPackage = "";

function choosePackage(packageName, packagePrice) {

  selectedPackage = packageName;

  const message =
`Halo Webinaja 👋

Saya tertarik dengan Paket ${packageName} (${packagePrice}).

Saya ingin konsultasi lebih lanjut mengenai website yang ingin saya buat.

Terima kasih.`;

  openWhatsApp(message);

}


/* ================= INVITATION ================= */

function orderInvitation() {

  const message =
`Halo Webinaja 👋

Saya tertarik dengan jasa Undangan Digital.

Saya ingin mengetahui harga dan fitur yang tersedia.

Terima kasih.`;

  openWhatsApp(message);

}


/* ================= PORTFOLIO MODAL ================= */

const modal = document.getElementById("demoModal");
const demoTitle = document.getElementById("demoTitle");
const demoDescription = document.getElementById("demoDescription");

let currentDemo = "";

function showDemo(title, description) {

  currentDemo = title;

  demoTitle.textContent = title;

  demoDescription.textContent = description;

  modal.classList.add("show");

  document.body.classList.add("no-scroll");

}


function closeDemo() {

  modal.classList.remove("show");

  document.body.classList.remove("no-scroll");

}


function orderDemo() {

  const message =
`Halo Webinaja 👋

Saya tertarik dengan konsep website "${currentDemo}".

Saya ingin konsultasi untuk membuat website dengan konsep tersebut.

Terima kasih.`;

  openWhatsApp(message);

  closeDemo();

}


/* Close modal by clicking outside */

modal.addEventListener("click", function(event) {

  if (event.target === modal) {
    closeDemo();
  }

});


/* Close modal with ESC */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeDemo();
  }

});


/* ================= FAQ ================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const button = item.querySelector("button");

  button.addEventListener("click", () => {

    const isActive =
      item.classList.contains("active");

    faqItems.forEach(otherItem => {
      otherItem.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }

  });

});


/* ================= MOBILE MENU ================= */

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");


menuToggle.addEventListener("click", () => {

  const isOpen =
    mobileMenu.classList.contains("open");

  mobileMenu.classList.toggle("open");

  menuToggle.classList.toggle("active");

  menuToggle.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  document.body.classList.toggle(
    "no-scroll",
    !isOpen
  );

});


/* Close mobile menu after clicking link */

const mobileLinks =
  mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("no-scroll");

  });

});


/* ================= NAVBAR SCROLL ================= */

const navbar =
  document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 20) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

});


/* ================= ADDON CALCULATOR ================= */

const addonCheckboxes =
  document.querySelectorAll(".addon-checkbox");

const addonTotal =
  document.getElementById("addonTotal");

const selectedAddons =
  document.getElementById("selectedAddons");


function formatRupiah(number) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(number);

}


function updateAddonTotal() {

  let total = 0;

  let names = [];

  addonCheckboxes.forEach(checkbox => {

    if (checkbox.checked) {

      const price =
        Number(checkbox.dataset.price);

      const name =
        checkbox.dataset.name;

      total += price;

      names.push(name);

    }

  });


  addonTotal.textContent =
    formatRupiah(total);


  if (names.length === 0) {

    selectedAddons.textContent =
      "Belum ada tambahan dipilih.";

  } else {

    selectedAddons.textContent =
      names.join(" • ");

  }

}


addonCheckboxes.forEach(checkbox => {

  checkbox.addEventListener(
    "change",
    updateAddonTotal
  );

});


/* ================= ADDON WHATSAPP ================= */

function orderAddons() {

  const selected = [];

  let total = 0;


  addonCheckboxes.forEach(checkbox => {

    if (checkbox.checked) {

      selected.push(
        checkbox.dataset.name
      );

      total += Number(
        checkbox.dataset.price
      );

    }

  });


  if (selected.length === 0) {

    openWhatsApp(
      `Halo Webinaja 👋

Saya ingin konsultasi mengenai tambahan fitur website.

Terima kasih.`
    );

    return;

  }


  const message =
`Halo Webinaja 👋

Saya tertarik menambahkan fitur:

${selected.map(item => `• ${item}`).join("\n")}

Estimasi tambahan: ${formatRupiah(total)}

Saya ingin konsultasi lebih lanjut.

Terima kasih.`;

  openWhatsApp(message);

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {

  updateAddonTotal();

});