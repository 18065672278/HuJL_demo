// src/components/verification/verification.js
/**
 * Created by hujl on 2019/6/11.
 */

import WXEXT from '../../components/common/common.js';
export default {
  /**TelFormat(联系电话验证)
   * @phone {type:num} 验证的字符串
   * @required 是否必填
   * @title 提示语标题
   * @content 提示语主要内容
   */
  TelFormat: function(phone, title, content, required) {
    var title = title || "";
    var content = content || "手机号码";
    var reg = /^1[3456789]\d{9}$/;
    if (phone) {
      if (!(reg.test(phone))) {
        WXEXT.showModal(title, content + "有误，请重填", false);
        return false;
      }
      return true;
    } else {
      if (required) {
        WXEXT.showModal(title, content + "不能为空", false);;
        return false;
      }
      return true;
    }
  },
  /**EmailFormat(邮箱验证)
   * @email {type:string} 验证的字符串
   * @required 是否必填
   * @title 提示语标题
   * @content 提示语主要内容
   */
  EmailFormat: function(email, title, content, required) {
    var title = title || "";
    var content = content || "邮箱";
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (email) {
      if (!reg.test(email)) {
        WXEXT.showModal(title, "有误，请重填", false);
        return false;
      }
      return true;
    } else {
      if (required) {
        WXEXT.showModal(title, content + "不能为空", false);;
        return false;
      }
      return true;
    }
  },
  /**PostalCode(邮政编码验证)
   * @postalcode {type:num} 验证的字符串
   * @required 是否必填
   * @title 提示语标题
   * @content 提示语主要内容
   */
  PostalCode: function(postalcode, title, content, required) {
    var title = title || "";
    var content = content || "邮政编码";
    var reg = /^[1-9][0-9]{5}$/;
    if (postalcode) {
      if (!reg.test(postalcode)) {
        WXEXT.showModal(title, content + "有误，请重填", false);
        return false;
      }
      return true;
    } else {
      if (required) {
        WXEXT.showModal(title, content + "不能为空", false);
        return false;
      }
      return true;
    }
  },
  /**IDcard(身份证验证)
   * @cardnum {type:num} 验证的字符串
   * @required 是否必填
   * @title 提示语标题
   * @content 提示语主要内容
   */
  IDcard: function(cardnum, title, content, required) {
    var required = required || true;
    var title = title || "";
    var content = content || "身份证";
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (cardnum) {
      if (!reg.test(cardnum)) {
        WXEXT.showModal(title, content + "有误，请重填", false);
        return false;
      }
      return true;
    } else {
      if (required) {
        WXEXT.showModal(title, content + "不能为空", false);
        return false;
      }
      return true;
    }
  },
  /**carID(车牌号验证)
   * @carNum {type:num} 验证的字符串
   * @required 是否必填
   * @title 提示语标题
   * @content 提示语主要内容
   */
  carID: function (carNum, title, content, required) {
    var required = required || true;
    var title = title || "";
    var content = content || "车牌号";
    var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    if (carNum && carNum != '请填写车牌号/车架号' && carNum != '请填写车牌号') {
      if (!reg.test(carNum)) {
        WXEXT.showModal(title, content + "有误，请重填", false);
        return false;
      }
      return true;
    } else {
      if (required) {
        WXEXT.showModal(title, content + "不能为空", false);
        return false;
      }
      return true;
    }
  },
};