// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand();

// Переменные
let counter = 0;
const counterElement = document.getElementById("counter");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const shareBtn = document.getElementById("share");

// Функция обновления счетчика на экране
function updateCounter() {
  counterElement.textContent = counter;

  // Обновляем главную кнопку в Telegram
  if (counter !== 0) {
    tg.MainButton.setText(`Сохранить результат: ${counter}`);
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
}

// Обработчики событий
increaseBtn.addEventListener("click", () => {
  counter++;
  updateCounter();

  // Добавляем тактильную обратную связь
  if (tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred("light");
  }
});

decreaseBtn.addEventListener("click", () => {
  counter--;
  updateCounter();

  if (tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred("light");
  }
});

shareBtn.addEventListener("click", () => {
  const message = `Мой результат в счетчике: ${counter}`;

  // Отправляем данные обратно в чат
  tg.sendData(
    JSON.stringify({
      action: "share_counter",
      value: counter,
      message: message,
    })
  );
});

// Обработчик главной кнопки Telegram
tg.MainButton.onClick(() => {
  const result = {
    action: "save_counter",
    value: counter,
    timestamp: new Date().toISOString(),
  };

  tg.sendData(JSON.stringify(result));
});

// Настройка темы
if (tg.colorScheme === "dark") {
  document.body.style.backgroundColor = "#1a1a1a";
  document.body.style.color = "#ffffff";
}

// Инициализация
updateCounter();

// Сообщаем Telegram, что приложение готово
tg.ready();
