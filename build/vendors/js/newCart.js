let products = [];
let deliveryPrice = 0;
const cartStorage = localStorage;

const jsonData = JSON.parse($(".cart__data-json").text());
const productTemplate = (product) => {
   return {
      count: 0,
      callories: product.program_calories,
      days: 1,
      calendarDays: [],
      customDays: [],
      cost: Math.abs(product.price),
      discountDays: 0,
      totalCost: Math.abs(product.price),
      totalCostPerDay: Math.abs(product.price),
      name: product.pagetitle,
      id: product.id,
      trial: false,
      weekend: true,
   };
};

const productsStartStorage = jsonData.map((product) =>
   productTemplate(product)
);

if (cartStorage.programs === undefined || cartStorage.version != "1.3") {
   products = productsStartStorage;
   cartStorage.setItem("programs", JSON.stringify(productsStartStorage));
   cartStorage.setItem("version", "1.3");
} else {
   products = JSON.parse(cartStorage.getItem("programs"));
}

const createOrderTemplate = (params) => {
   const days = [
      [1, "день"],
      [7, "дней", $(".discount_7").attr("data-discount")],
      [14, "дней", $(".discount_14").attr("data-discount")],
      [30, "дней", $(".discount_30").attr("data-discount")],
      params.calendarDays,
   ];
   const persons = [
      [1, "человек"],
      [2, "человека"],
      [3, "человека"],
      [4, "человека"],
   ];
   const createDateButton = (count, text, choosenDays, trial, calendarDays) => {
      if (count) {
         return `
        <button type='button' class="order__item order__item--days ${
           count === choosenDays && trial === false && calendarDays
              ? "active"
              : ""
        }">
            <span class="order__value">${count} ${text}</span>
            ${getDiscount(count)}
        </button>`;
      }
   };
   const createPersonsList = (count, text, choosenPersons, trial) => {
      return ` 
            <button type='button' class="order__item order__item--persons ${
               count === choosenPersons ? "active" : ""
            } ${trial ? "disabled" : ""}">
                <span class="order__value">${count} ${text}</span>
            </button>`;
   };

   const getDiscount = (days) => {
      if (!!$(`.discount_${days}`).attr("data-discount")) {
         return `<span class="order__discount">${$(`.discount_${days}`).attr(
            "data-discount"
         )}%</span>`;
      } else {
         return "";
      }
   };
   return `<div class="order" data-name='${params.name}'>
                <div class="order__program">
                    <input type='hidden' name='id' value='${params.id}'>
                    <h4 class="order__name">${params.name}</h4>
                    <span class="order__callories">${
                       params.callories
                    } Ккал.</span>
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' name='days' class='order__days-input' value="${
                           params.days
                        }">
                        ${days
                           .map((day) => {
                              console.log(day, day[0]);
                              return createDateButton(
                                  day[0],
                                  day[1],
                                  params.days,
                                  params.trial,
                                  params.calendarDays
                               )
                           }
                           )
                           .join("")}
                        <button type='button' class="order__item order__item--days order__item--try ${
                           trialBlockOrder() && !params.trial ? "disabled" : ""
                        } ${params.trial ? "active" : ""}">
                            <span class="order__value">1</span>
                            <span>Пробный день</span>
                            <span class="order__discount">${$(
                               ".discount_trial"
                            ).attr("data-discount")}%</span>
                        </button>
                        <button type='button' class="result__choose result__choose--order">
                            <span>Выбрать даты</span>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.62451 9.16667H8.32543V10.8333H6.62451V9.16667ZM6.62451 12.5H8.32543V14.1667H6.62451V12.5ZM10.0263 9.16667H11.7273V10.8333H10.0263V9.16667ZM10.0263 12.5H11.7273V14.1667H10.0263V12.5ZM13.4282 9.16667H15.1291V10.8333H13.4282V9.16667ZM13.4282 12.5H15.1291V14.1667H13.4282V12.5Z"
                                    fill="white" />
                                <path
                                    d="M4.92357 18.3333H16.83C17.768 18.3333 18.5309 17.5858 18.5309 16.6667V5.00001C18.5309 4.08084 17.768 3.33334 16.83 3.33334H15.1291V1.66667H13.4281V3.33334H8.3254V1.66667H6.62448V3.33334H4.92357C3.98552 3.33334 3.22266 4.08084 3.22266 5.00001V16.6667C3.22266 17.5858 3.98552 18.3333 4.92357 18.3333ZM16.83 6.66667L16.8308 16.6667H4.92357V6.66667H16.83Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <button type='button' class='order__weekend ${
                           params.weekend ? "" : "checked"
                        }'>
                           <span class='order__check'></span>
                           <span>Без выходных</span>
                        </button>
                    </div>
                    <svg class='order__arrow' width="10" height="7" viewBox="0 0 10 7" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.00001 6.53422C4.74401 6.53422 4.48801 6.436 4.29301 6.24057L0.293006 2.23174C-0.0979942 1.83988 -0.0979942 1.20648 0.293006 0.814619C0.684006 0.422756 1.31601 0.422756 1.70701 0.814619L5.01201 4.12691L8.30501 0.939895C8.70401 0.556049 9.33501 0.567074 9.71901 0.96495C10.103 1.36283 10.092 1.99823 9.69501 2.38207L5.69501 6.2526C5.50001 6.44101 5.25001 6.53422 5.00001 6.53422Z"
                            fill="#222B45" />
                    </svg>
                </div>
                <div class="order__list">
                    <div class="order__box">
                        <input type='hidden' class='order__persons-input' name='count' value="${
                           params.count
                        }">
                        ${persons
                           .map((person) =>
                              createPersonsList(
                                 person[0],
                                 person[1],
                                 params.count,
                                 params.trial
                              )
                           )
                           .join("")}
                    </div>
                    <svg class='order__arrow' width="10" height="7" viewBox="0 0 10 7" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.00001 6.53422C4.74401 6.53422 4.48801 6.436 4.29301 6.24057L0.293006 2.23174C-0.0979942 1.83988 -0.0979942 1.20648 0.293006 0.814619C0.684006 0.422756 1.31601 0.422756 1.70701 0.814619L5.01201 4.12691L8.30501 0.939895C8.70401 0.556049 9.33501 0.567074 9.71901 0.96495C10.103 1.36283 10.092 1.99823 9.69501 2.38207L5.69501 6.2526C5.50001 6.44101 5.25001 6.53422 5.00001 6.53422Z"
                            fill="#222B45" />
                    </svg>
                </div>
                <button type='button' class="order__remove">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.5 12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25H1.5V12.25ZM3 4.75H9V12.25H3V4.75ZM8.625 1L7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625Z"
                            fill="#979C9E" />
                    </svg>
                </button>
                <span class="order__price">
                    <span class="order__priceVal">${
                       params.totalCostPerDay
                    }</span>
                </span>
            </div>`;
};

const resetProperty = (property, program) => {
   const reset = productTemplate(program)[property];
   program[property] = reset;
};

const getCurrentProgramName = (e) => {
   return $(e.currentTarget).closest("div[data-name]").attr("data-name");
};

const getCurrentProgram = (e) => {
   return products.find((el) => el.name === getCurrentProgramName(e));
};

const getCurrentProgramIndex = (e) => {
   return products.findIndex((el) => el.name === getCurrentProgramName(e));
};

const getProgramInCalendar = () => {
   return products.find(
      (product) =>
         product.name === $(clicked).closest("div[data-name]").attr("data-name")
   );
};

const getTrialOrderProductName = () => {
   return products.find((el) => el.trial).name;
};

const getDeliveryPrice = (deliveryPrice) => {
   const days = products.map((product) => product.days);
   return deliveryPrice * Math.max(...days);
};
getDeliveryPrice();

const setStorage = () => {
   cartStorage.setItem("programs", JSON.stringify(products));
};

const getCurrentStorage = () => {
   return JSON.parse(cartStorage.getItem("programs"));
};

const removeItem = (index) => {
   const product = products[index];
   products[index] = productTemplate(jsonData[index]);
   $(`.order[data-name="${product.name}"]`).remove();
   setStorage();
};

const addItem = (product) => {
   !product.count && product.count++;
   $(`.order[data-name="${product.name}"]`).remove();
   $(".cart__order").append(createOrderTemplate(product));
   setStorage();
};

const getProductCost = (product) => {
   product.totalCostPerDay = product.cost * product.count;
   const discountDaysRubbles =
      product.totalCostPerDay * (product.discountDays / 100);
   product.totalCostPerDay -= discountDaysRubbles;
   product.totalCost = product.totalCostPerDay * product.days;
   return parseInt(product.totalCostPerDay);
};

const getAllProductsCount = () => {
   return getCurrentStorage().reduce((total, current) => {
      return current.count ? (total += current.count) : total;
   }, 0);
};

const getAllProductsCountBasket = () => {
   return getCurrentStorage().reduce((total, current) => {
      return current.count ? ++total : total;
   }, 0);
}



const getTotalCost = () => {
   const discountFamily = Math.abs(
      parseInt($(".discount_family").attr("data-discount"))
   );
   const currentData = JSON.parse(cartStorage.getItem("programs"));
   const allProuctsCost = currentData.reduce((total, current) => {
      return current.count ? (total += current.totalCost) : total;
   }, 0);

   const totalCost =
      getAllProductsCount() > 1
         ? allProuctsCost - allProuctsCost * (discountFamily / 100)
         : allProuctsCost;
   getAllProductsCount() > 1
      ? $(".cart__discount-family, .cart__priceBlock--family").removeClass(
           "hidden"
        )
      : $(".cart__discount-family, .cart__priceBlock--family").addClass(
           "hidden"
        );
   return parseInt(totalCost);
};

const setCustomDays = (days, customDays, container, itemClassName) => {
   const doesItOrder = $(clicked).hasClass("result__choose--order");
   const daysForm = (days) => {
      const n = days % 10;
      switch (true) {
         case n > 4 || n === 0 || (days > 10 && days < 20):
            return " дней";
         case (days > 1 && days < 5) || (n > 1 && n < 5):
            return " дня";
         default:
            return " день";
      }
   };

   const customDayTemplate = (days) =>
      `<button type='button' class="${itemClassName} order__item--days custom active">
                 <span class="order__value">${days} ${daysForm(days)}</span>
          </button>`;
   container.find("input").val(days);
   container.find(".custom").remove();
   container.find("button").removeClass("active");
   container.prepend(customDayTemplate(days));
   $(".dpicker").removeClass("active");
   getProgramInCalendar().days = days;
   getProgramInCalendar().customDays = customDays;
   getProgramInCalendar().calendarDays = [days, daysForm(days)];
   if (doesItOrder) setStorage();
};

//Расчет заказа

const operateOrder = (e, container, daysButton, daysInput, personsInput) => {
   if (!$(e.currentTarget).hasClass("active")) {
      resetProperty("calendarDays", getCurrentProgram(e));
      resetProperty("customDays", getCurrentProgram(e));
      $(e.currentTarget).siblings(".custom").remove();
   }
   list(container, e, true);
   const currentOrder = $(e.currentTarget).closest(
      `div[data-name=${getCurrentProgramName(e)}`
   );
   const currentDaysDiscount = currentOrder
      .find(`${daysButton}.active span[class*=discount]`)
      .text();
   const currentDay = currentOrder.find(daysInput).val();
   const currentCount = currentOrder.find(personsInput).val();
   getCurrentProgram(e).days = parseInt(currentDay);
   getCurrentProgram(e).count = parseInt(currentCount);
   getCurrentProgram(e).discountDays = Math.abs(
      parseInt(currentDaysDiscount) || 0
   );
   setTrialOrder(e);
};

//пробный день

const trialBlockOrder = () => {
   return products.some((product) => product.trial);
};

const setTrialOrder = (e) => {
   const buttons = $(e.target)
      .closest("div[data-name]")
      .find("button[class*=person");
   if ($(e.currentTarget).hasClass("order__item--try")) {
      getCurrentProgram(e).trial = !trialBlockOrder();
      getCurrentProgram(e).count = 1;
      buttons
         .addClass("disabled")
         .removeClass("active")
         .eq(0)
         .addClass("active");
   } else {
      buttons.removeClass("disabled");
      resetProperty("trial", getCurrentProgram(e));
   }
};

const resetBlockTrialOrder = (e) => {
   if (!trialBlockOrder()) {
      $(".order__item--try").removeClass("disabled");
   } else {
      $(".order__item--try").addClass("disabled");
      $(`.order[data-name=${getTrialOrderProductName()}`)
         .find(".order__item--try")
         .removeClass("disabled");
   }
};

const addTrialFromIndex = () => {
   const choosenTrialProgram = $(".try__program.active").attr("data-name");
   const trialDiscount = Math.abs(
      parseInt($(".discount_trial").attr("data-discount"))
   );
   const currentProgramIndex = products.findIndex(
      (product) => product.name === choosenTrialProgram
   );
   products = getCurrentStorage();
   products[currentProgramIndex] = productTemplate(
      jsonData[currentProgramIndex]
   );
   products[currentProgramIndex].trial = true;
   products[currentProgramIndex].count = 1;
   products[currentProgramIndex].discountDays = trialDiscount;
   products[currentProgramIndex].totalCostPerDay = getProductCost(
      products[currentProgramIndex]
   );
};

const printPrice = (totalContainer, deliveryContainer) => {
   totalContainer && $(totalContainer).text(getTotalCost());
   deliveryContainer &&
      $(deliveryContainer).text(
         getTotalCost() + getDeliveryPrice(deliveryPrice)
      );
};

$(window).on("load", () => {
   //Добавление товаров при загрузке
   $(products).each((i, product) => {
      if (product.count) {
         $(".cart__order").append(createOrderTemplate(product));
      }
   });
   printPrice(".cart__totalVal", ".cart__priceDelivery-total");
   $(".header__basket").attr("data-count", getAllProductsCountBasket());

   //добавить заказ+

   $(".cart__add").on("click", () => {
      $(".add").addClass("active");
   });

   $(".add__close").on("click", () => {
      $(".add").removeClass("active");
   });

   $(".add__program").on("click", (e) => {
      switchActive($(e.currentTarget), ".add__program");
   });

   $(".add__submit").on("click", (e) => {
      $(".add").removeClass("active");
      addItem(
         products.find(
            (product) =>
               product.name === $(".add__program.active").attr("data-name")
         )
      );
      printPrice(".cart__totalVal", ".cart__priceDelivery-total");
      $(".header__basket").attr("data-count", getAllProductsCountBasket());
   });

   $('.intro__order').on('click', e => {
      console.log(getCurrentProgram(e))
      addItem(getCurrentProgram(e));
      printPrice(".cart__totalVal", "");
      $('.modal--cart').addClass('active');
   });

   //выходные и кастомные дни в календаре
   $(".cart__checkout--trial").on("click", (e) => {
      e.preventDefault();
      if (trialBlockOrder()) {
         $(".try__label--warn").removeClass("hidden");
      } else {
         addTrialFromIndex();
         setStorage();
         $(".try__label--warn").addClass("hidden");
         location.href = $(e.currentTarget).attr("href");
      }
   });
   $(".dpicker__done").on("click", () => {
      const days = $(".dpicker__item.ranged").length;
      const customDays = [
         $(".dpicker__item.first").attr("data-date"),
         $(".dpicker__item.last").attr("data-date"),
      ];
      const container = $(clicked).closest('div[class*="box"');
      const itemClassName = $(clicked).hasClass("result__choose--order")
         ? "order__item"
         : "result__item";
      const putItInStorage = $(".dpicker").hasClass("dpicker--order");
      const $connectedWithCalendarOrder = $(`.order[data-name=${getProgramInCalendar().name}] .order__weekend`);
      setCustomDays(days, customDays, container, itemClassName);
      resetProperty("trial", getProgramInCalendar());
      resetProperty("discountDays", getProgramInCalendar());
      getProgramInCalendar().weekend = !$(
         ".result__weekend--calendar"
      ).hasClass("checked");
      if ($(".result__weekend--calendar").hasClass("checked")) {
         $connectedWithCalendarOrder.addClass("checked");
      } else {
         $connectedWithCalendarOrder.removeClass("checked");
      }
      $('.result__weekend--calendar').removeClass('checked');
      $(".result__priceAfter").text(getProductCost(getProgramInCalendar()));
      if (putItInStorage) {
         setStorage();
         printPrice(".cart__totalVal", ".cart__priceDelivery-total");
      }
   });

   $(".result__weekend").on("click", (e) => {
      $(e.currentTarget).toggleClass("checked");
      if ($(e.currentTarget).hasClass("checked")) {
         $(".dpicker__item.ranged[data-weekend]")
            .removeClass("ranged")
            .addClass("removed");
      } else {
         $(".dpicker__item.removed").addClass("ranged");
      }
   });

   $(".result__choose").on("click", (e) => {
      $(e.currentTarget)
         .closest('div[class*="box"')
         .removeClass("open")
         .attr("style", "");
   });

   //Формирование и расчет заказа

   //Расчет

   $(".result").on("click", ".result__item", (e) => {
      operateOrder(
         e,
         ".result__box",
         ".result__item-days",
         ".result__days-input",
         ".result__persons-input"
      );
      $(".result__priceAfter").text(getProductCost(getCurrentProgram(e)));
   });

   $(".result__order").on("click", (e) => {
      addItem(getCurrentProgram(e));
      $(".header__basket").attr("data-count", getAllProductsCountBasket());
      $(".modal--cart").addClass("active");
      printPrice(".cart__totalVal", "");
   });

   //Формирование

   $(document).on("click", ".order__item", (e) => {
      operateOrder(
         e,
         ".order__box",
         ".order__item--days",
         ".order__days-input",
         ".order__persons-input"
      );
      $(e.currentTarget)
         .closest(".order")
         .find(".order__priceVal")
         .text(getProductCost(getCurrentProgram(e)));
      resetBlockTrialOrder(e);
      setStorage();
      printPrice(".cart__totalVal", ".cart__priceDelivery-total");
   });

   $(document).on("click", ".order__remove", (e) => {
      removeItem(getCurrentProgramIndex(e));
      printPrice(".cart__totalVal", ".cart__priceDelivery-total");
      $(".header__basket").attr("data-count", getAllProductsCountBasket());
   });

   $(document).on("click", ".order__weekend", (e) => {
      $(e.currentTarget).toggleClass("checked");
      getCurrentProgram(e).weekend = !$(e.currentTarget).hasClass("checked");
      setStorage();
   });

   $(".header__basket").on("click", () => {
      products = getCurrentStorage();
   });

   //фикс закрытия списка

   // $(document).on("click", (e) => {
   //    if (
   //       !$(e.target).closest("div[class*=box]") ||
   //       !$(e.target).is("div[class*=box]")
   //    )
   //       $("div[class*=box]").removeClass("open").attr("style", "");
   // });
});
