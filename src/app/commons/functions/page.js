import { IsValid } from './properties';
import { toastr } from 'react-redux-toastr';

function Refresh(seconds) {
  window.location.reload(seconds);
}

function IsNeedRefresh(isRefresh = false) {
  if (!IsValid(localStorage.getItem("isRefresh"))) {
    localStorage.setItem("isRefresh", 0);
  }
  else if (localStorage.getItem("isRefresh") == 0 && isRefresh == true) {
    localStorage.setItem("isRefresh", 1);
    window.location.reload(10);
  } else if (!IsValid(localStorage.getItem("_sp_token_employee"))) {
    localStorage.clear();
  }
}

function IsNeedRedirect() {
  if (IsValid(localStorage.getItem("_sp_token_employee"))) {
    Redirect('');
  }
}

function Redirect(pathName) {
  var path = `${window.location.origin}/${pathName}`;
  window.location.replace(path);
}

export { Refresh, IsNeedRefresh, Redirect, IsNeedRedirect }