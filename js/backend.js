'use strict';

(function () {
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZEDS: 401,
    NOT_FOUND: 404,
    INTERNAL_STATUS_ERROR: 500
  };
  var TIMEOUT_IN_MS = 10000;

  window.backend = {
    // Выгрузка с сервера данных
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case StatusCode.OK:
            onLoad(xhr.response);
            break;
          case StatusCode.BAD_REQUEST:
            error = xhr.status + ': Неверный запрос';
            break;
          case StatusCode.UNAUTHORIZEDS:
            error = xhr.status + ': Пользователь не авторизован';
            break;
          case StatusCode.NOT_FOUND:
            error = xhr.status + ': Страница с объявлениями не найдена. Пожалуйста, обновите страницу или попробуйте позднее';
            break;
          case StatusCode.INTERNAL_STATUS_ERROR:
            error = xhr.status + ': Неверный адрес для отправки';
            break;
          default:
            error = xhr.status + ': Произошла ошибка при загрузить список похожих объявлений. Пожалуйста, обновите страницу или попробуйте позднее';
        }

        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения. Нет подключения к Интернету');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Превышено время ожидания. Пожалуйста, попробуйте позднее');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
