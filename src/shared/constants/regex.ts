export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  PHONE: /^[0-9]{10}$/,
  GSTIN: /\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}\w{1}[Z]{1}\w{1}\b/,
  ACCESS_CODE: /^[0-9]{1,4}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/, 
  UPI: /^[\w.-]+@[\w.-]+$/, 
  ACCOUNTNO: /^[0-9]{6,18}$/,
  NAME : /^[A-Za-z]+$/ ,
  ID: /^[0-9]+$/,
  LOCATION: /^[A-Za-z0-9 ]+$/
};
