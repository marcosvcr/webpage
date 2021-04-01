import Constants from "./Constants";

export class Utils {
  isEmailValid(mail) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }

  isCPNJValid(s) {
    let cnpj = s.replace(/[^\d]+/g, "");

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) return false;

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Cáculo de validação
    let t = cnpj.length - 2,
      d = cnpj.substring(t),
      d1 = parseInt(d.charAt(0)),
      d2 = parseInt(d.charAt(1)),
      calc = (x) => {
        let n = cnpj.substring(0, x),
          y = x - 7,
          s = 0,
          r = 0;

        for (let i = x; i >= 1; i--) {
          s += n.charAt(x - i) * y--;
          if (y < 2) y = 9;
        }

        r = 11 - (s % 11);
        return r > 9 ? 0 : r;
      };

    return calc(t) === d1 && calc(t + 1) === d2;
  }

  trim(strTexto) {
    // Substitúi os espaços vazios no inicio e no fim da string por vazio.
    return strTexto.replace(/^\s+|\s+$/g, "");
  }

  // Função para validação de CEP.
  isCEP(strCEP) {
    // Caso o CEP não esteja nesse formato ele é inválido!
    var objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;

    let formatedCEP = this.trim(strCEP);
    formatedCEP = strCEP.replace(".", "");
    formatedCEP = formatedCEP.replace("-", "");

    if (formatedCEP.length > 0) {
      if (objER.test(formatedCEP)) return true;
      else return false;
    } else return false;
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  getRegisterResultString(registerStatus) {
    switch (registerStatus) {
      case Constants.SUCCESS:
        return "Cadastro realizado com sucesso. Acesse o seu e-mail e abra o link que enviamos para confirmar o seu cadastro.";
      case Constants.EMAIL_ALREADY_REGISTERED:
        return "O e-mail digitado já possui cadastro no sistema.";
      case Constants.CPF_ALREADY_REGISTERED:
        return "O CPF digitado já possui cadastro no sistema.";
      case Constants.CNPJ_ALREADY_REGISTERED:
        return "O CNPJ digitado já possui cadastro no sistema.";
      default:
        return "";
    }
  }

  sortBy(field, reverse, primer) {
    var key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      // eslint-disable-next-line
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  }

  // Returns the uppercase of a string only if it not null or undefined
  treatUppercase(str) {
    if (undefined !== str && null !== str) {
      return str.toUpperCase();
    } else {
      return " ";
    }
  }
}

export default Utils;
