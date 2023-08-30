//<CloseWindow>
const closeWindow = function () {
	function closeSelect(event) {
		if (
			!event.classList.contains("_select__header") &&
			!event.classList.contains("_select__item")
		) {
			document.querySelectorAll("._select").forEach(item => {
				if (
					item.querySelector("._select__body").classList.contains("_active")
				) {
					item.querySelector("._select__body").classList.remove("_active");
					item.querySelector("._select__header").classList.remove("_rotate");
				}
			});
		}
	}
	function closeAccordeon(event) {
		if (!event.classList.contains("_button-accordeon")) {
			document.querySelectorAll("._button-accordeon").forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					item.nextElementSibling.classList.remove("_active");
				}
			});
		}
	}
	function closeBurger(event) {
		if (!event.classList.contains("_burger-cross")) {
			document.querySelectorAll("._burger-cross").forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					document.querySelector("._burger-list").classList.remove("_active");
				}
			});
		}
	}
	window.addEventListener("click", event => {
		closeSelect(event.target);
		closeAccordeon(event.target);
		closeBurger(event.target);
	});
};

//</CloseWindow>

//<Accordeon>
const accordeon = function () {
	const btn = document.querySelectorAll("._button-accordeon");

	btn.forEach(item => {
		item.addEventListener("click", active);
	});
	function active() {
		if (!this.classList.contains("_active")) {
			btn.forEach(item => {
				if (item.classList.contains("_active")) {
					item.classList.remove("_active");
					item.nextElementSibling.classList.remove("_active");
				}
			});
		}
		this.classList.toggle("_active");
		this.nextElementSibling.classList.toggle("_active");
	}
};
// accordeon();

//</Accordeon>

//<Burger>
const burger = function () {
	const icon = document.querySelector("._burger-cross");

	function active() {
		this.classList.toggle("_active");
		document.querySelector("._burger-list").classList.toggle("_active");
	}
	icon.addEventListener("click", active);
};
// burger();

//</Burger>

//<Select>
let select = function () {
	let selectHeader = document.querySelectorAll("._select__header");
	let selectItem = document.querySelectorAll("._select__item");

	selectHeader.forEach(item => {
		item.addEventListener("click", selectToggle);
	});

	selectItem.forEach(item => {
		item.addEventListener("click", selectChoose);
	});
	function closeAll() {
		document.querySelectorAll("._select").forEach(item => {
			if (item.querySelector("._select__body").classList.contains("_active")) {
				item.querySelector("._select__body").classList.remove("_active");
				item.querySelector("._select__header").classList.remove("_rotate");
			}
		});
	}

	function selectToggle() {
		closeAll();
		this.classList.toggle("_rotate");
		this.nextElementSibling.classList.toggle("_is-active");
	}

	function selectChoose() {
		let text = this.innerText,
			select = this.closest(".select"),
			currentText = select.querySelector(".select__header"),
			bodyActive = select.querySelector(".select__body");
		currentText.innerText = text;
		bodyActive.classList.remove("_is-active");
		currentText.classList.remove("_rotate");
	}
};
//select();

//<Select>

//<Scroll to the block>
const scrollToBlock = function () {
	const btn = document.querySelectorAll("._scroll-btn"), // кнопок может быть несколько
		block = document.querySelector("._scrollBlock-bg"), //Фон - накрывает все блоки
		cross = block.querySelector("._cross");
	btn.forEach(item => {
		item.addEventListener("click", open);
	});
	cross.addEventListener("click", open);
	function open() {
		block.classList.toggle("_active");
		block.scrollIntoView({ behavior: "smooth" });
	}
};
// scrollToBlock();

//</Scroll to the block>

// <Moving (перемещение) a tag>
const movingTag = function () {
	const tag = document.querySelector("._tag").cloneNode(true),
		whereFrom = document.querySelector("._откуда"),
		where = document.querySelector("_куда");

	function handleTabletChange(addElement, removeElement) {
		if (!addElement.querySelector("._tag")) addElement.append(tag);
		if (removeElement.querySelector("._tag"))
			removeElement.querySelector("._tag").remove();
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth < 991.98) handleTabletChange(whereFrom, where);
		if (window.innerWidth > 991.98) handleTabletChange(where, whereFrom);
	});
	function controlWidth() {
		if (window.innerWidth < 991.98) handleTabletChange(whereFrom, where);
	}
	controlWidth();
};
// movingTag();
// </Moving (перемещение) a tag>
//<Menu-scroll>
const menuScroll = function () {
	const header = document.querySelector(".header__wrapper"),
		headerH = header.clientHeight,
		mainAuthor = document.querySelector(".main-author");

	document.onscroll = function () {
		const scroll = window.scrollY;
		if (scroll > headerH + 20) {
			header.classList.add("fixed-header");
			mainAuthor.classList.add("padding-fixed");
		} else {
			header.classList.remove("fixed-header");
			mainAuthor.classList.remove("padding-fixed");
		}
	};
};

// menuScroll();
//</Menu-scroll>
//<Menu-scroll2>
const menuScroll = function () {
	const header = document.querySelector(".header__wrapper"),
		mainAuthor = document.querySelector(".main-author");

	window.addEventListener("scroll", function () {
		header.classList.toggle("fixed-header", window.scrollY > 5);
		mainAuthor.classList.toggle("padding-fixed", window.scrollY > 5);
	});
};
// menuScroll();
//</Menu-scroll2>

//<RenderSkills> Чтение JSON и рендер данных в swiper (style="width: ${data[key].stars * 20}%;) - звездный рейтинг управление
const renderSlideSkills = function () {
	const parent = document.querySelector("#wrapper-skills");
	function renderSkills(data, key) {
		return `<div class="main-skills__slide slide-skills swiper-slide">
									<div class="slide-skills__img">
										<img src="${data[key].img}" alt="skill" />
									</div>
									<h3 class="slide-skills__title">${data[key].title}</h3>
									<div class="slide-skills__star">
										<div class="slide-skills__active" style="width: ${data[key].stars * 20}%;">
									</div>
								</div>`;
	}
	fetch("json/skills.json")
		.then(response => response.json())
		.then(data => {
			console.log(data);
			for (let key in data) {
				parent.insertAdjacentHTML("beforeend", renderSkills(data, key));
			}
			if (document.querySelector(".main-skills__swiper")) {
				new Swiper(".main-skills__swiper", {
					loop: true,
					slidesPerView: 4,
					grabCursor: true,
					spaceBetween: 9,
					autoHeight: true,
					speed: 800,
					watchOverflow: true,
					loopAdditionalSliders: true,
					pagination: {
						el: ".main-skills__dots",
						clickable: true,
					},
					autoplay: {
						delay: 2000,
						disableOnInteraction: false,
					},
					slideToClickedSlide: true,
					breakpoints: {
						320: {
							slidesPerView: 1.0,
						},
						440: {
							slidesPerView: 2,
						},
						650: {
							slidesPerView: 3,
						},
						950: {
							slidesPerView: 4.0,
						},
					},
				});
			}
		})
		.catch(error => {
			console.log(error);
		});
};
renderSlideSkills();
//</RenderSkills>
