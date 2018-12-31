require('bootstrap');

module.exports = function () {

  /*
   *	Class Bundle App client side
   */
  const Users = class Users {
    constructor() {
      $(document).ready(() => {
        this.ready();
      });
    }

    ready() {
      let selectorLang = global.document.getElementById("lang");
      if (selectorLang) {
        selectorLang.addEventListener("change", (e) => {
          //window.location.href = "?lang=" + this.value;
          this.changeLang();
          e.preventDefault();
        });
      }
      $(".password-button").on("click", () => {
        this.showPassword($(".password"), $(".password-icon"));
      });
      $("#inputGroupRole").on("change", () => {
        this.checkSelect();
      });
      $("#inputGroupRole")[0].size = $("#inputGroupRole option").length;
      $(document).on('submit', () => {
        $("#roles").removeAttr("disabled");
      });
      $("#roles option").on("click", (ev) => {
        let val = $(ev.target).val();
        $(`#inputGroupRole option[value=${val}]`).prop("selected", true);
        this.checkSelect();
      });
      $("#iconGroupRole").on("click", (ev) => {
        let val = $("#inputGroupRole").val();
        let ele = $(ev.target);
        switch (true) {
        case ele.hasClass("fa-plus-circle"):
          let opt = $('<option>', {
            value: val,
            text: val,
            selected: ""
          });
          $('#roles').append(opt);
          opt.on("click", () => {
            $(`#inputGroupRole option[value=${val}]`).prop("selected", true);
            this.checkSelect();
          });
          //$("#inputGroupRole option[value=none]").prop("selected", true);
          break;
        case ele.hasClass("fa-minus-circle"):
          $(`#roles option[value=${val}]`).remove();
          //$("#inputGroupRole option[value=none]").prop("selected", true);
          break;
        default:
          $("#inputGroupRole")[0].size = $("#inputGroupRole option").length;
        }
        this.checkSelect();
      });
    }

    changeLang(query) {
      if (query) {
        return window.location.href = "?lang=" + query;
      }
      let form = global.document.getElementById("formLang");
      if (form) {
        form.submit();
      }
    }

    checkSelect() {
      const tab = $("#roles").val() || [];
      const select = $("#inputGroupRole");
      const icon = $("#iconGroupRole");
      const val = select.val();

      if (val === "none") {
        icon.removeClass("fa-plus-circle");
        icon.removeClass("fa-minus-circle");
        icon.addClass("fa-wrench");
        return;
      }
      icon.removeClass("fa-wrench");
      if (tab.indexOf(val) >= 0) {
        icon.removeClass("fa-plus-circle");
        icon.addClass("fa-minus-circle");
      } else {
        icon.removeClass("fa-minus-circle");
        icon.addClass('fa-plus-circle');
      }
    }

    showPassword(tag, icon) {
      if (!(tag instanceof jQuery)) {
        tag = $(tag);
      }
      if (!(icon instanceof jQuery)) {
        icon = $(icon);
      }
      return tag.attr("type", function (index, attr) {
        switch (attr) {
        case "text":
          icon.removeClass("fa-eye");
          icon.addClass("fa-eye-slash");
          return "password";
        case "password":
          icon.removeClass("fa-eye-slash");
          icon.addClass("fa-eye");
          return "text";
        }
      });
    }
  };

  return new Users();
}();