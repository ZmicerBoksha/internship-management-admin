export const COUNTRY_LIST = new Map<string, any>([
  [
    'US',
    [
      'Pacific/Honolulu',
      'America/Adak',
      'America/Anchorage',
      'America/Atka',
      'America/Boise',
      'America/Chicago',
      'America/Denver',
      'America/Detroit',
      'America/Indiana/Indianapolis',
      'America/Indiana/Knox',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Tell_City',
      'America/Indiana/Vevay',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Juneau',
      'America/Kentucky/Louisville',
      'America/Kentucky/Monticello',
      'America/Los_Angeles',
      'America/Menominee',
      'America/Metlakatla',
      'America/New_York',
      'America/Nome',
      'America/North_Dakota/Beulah',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/Phoenix',
      'America/Sitka',
      'America/Yakutat',
    ],
  ],
  ['Poland', 'Europe/Warsaw'],
  ['Lithuania', 'Europe/Vilnius'],
  ['Germany', 'Europe/Berlin'],
  ['Belarus', 'Europe/Moscow'],
  ['Ukraine', 'Europe/Kiev'],
  [
    'Russia',
    [
      'Asia/Anadyr',
      'Asia/Barnaul',
      'Asia/Chita',
      'Asia/Irkutsk',
      'Asia/Kamchatka',
      'Asia/Khandyga',
      'Asia/Krasnoyarsk',
      'Asia/Magadan',
      'Asia/Novokuznetsk',
      'Asia/Novosibirsk',
      'Asia/Omsk',
      'Asia/Sakhalin',
      'Asia/Srednekolymsk',
      'Asia/Tomsk',
      'Asia/Ust-Nera',
      'Asia/Vladivostok',
      'Asia/Yakutsk',
      'Asia/Yekaterinburg',
      'Europe/Astrakhan',
      'Europe/Kaliningrad',
      'Europe/Kirov',
      'Europe/Moscow',
      'Europe/Samara',
      'Europe/Saratov',
      'Europe/Ulyanovsk',
      'Europe/Volgograd',
    ],
  ],
  ['Uzbekistan', 'Asia/Tashkent'],
]);

export const ADD_PATH = '/staff/add';
export const PUT = 'PUT';
export const POST = 'POST';
export const GET = 'GET';


export const HR = 'HR';
export const TS = 'TS';

export const PREFIX = `http://localhost:8085/api/`;

export const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PHONE_PATTERN = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const REQUIRED__ERROR__MESSAGE = `This field is required`;
export const MAX__LENGTH__ERROR__MESSAGE = (number: number) => `This field cannot exceed ${number} characters`;
export const MAX__LENGTH = 20;

export const TIME_SLOTS_BACKEND_FORMAT = 'Y-MM-DD HH:mm';

export const TIME_SLOT_DURATION = 30;
