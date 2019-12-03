export const INDEX_PATH = '/';

export const WALLET_PATH = `${INDEX_PATH}wallet`;
export const CREATE_WALLET_PATH = `${WALLET_PATH}/create`;
export const IMPORT_WALLET_PATH = `${WALLET_PATH}/import`;

export const DASHBOARD_PATH = `${INDEX_PATH}dashboard`;
export const SEND_TRANSACTION_PATH = `${DASHBOARD_PATH}/send`;
export const PAYMENT_DETAILS = `${SEND_TRANSACTION_PATH}/payment-details`;

export const RECEIVE_PATH = `${DASHBOARD_PATH}/receive`;
export const GENERATE_PAYMENT = `${RECEIVE_PATH}/generate-payment`;
export const PAYMENT_INFO1 = `${RECEIVE_PATH}/payment-info1`;
export const PAYMENT_INFO2 = `${RECEIVE_PATH}/payment-info2`;
export const SETTINGS_PATH = `${DASHBOARD_PATH}/settings`;
export const BACKUP_PATH = `${SETTINGS_PATH}/backup`;
export const CHANGE_PASSWORD_PATH = `${SETTINGS_PATH}/change-password`;
export const CREATE_TOUCH_ID_PATH = `${SETTINGS_PATH}/touch-id`;
export const EXCHANGE_FUNDS_PATH = `${DASHBOARD_PATH}/exchange-funds`;
export const TRANSACTION_DETAILS = `${DASHBOARD_PATH}/transaction-details`;
