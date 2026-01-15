export const esliteOrigin = 'https://www.eslite.com';

// path
export const productPathRegex = /^\/product\/([0-9a-zA-Z]{12,})(?:((\?|\/\?|#)[^/\s]*)|\/){0,1}$/;
export const exhibitionPathRegex = /^\/exhibitions\/([A-Z]{2}[0-9]{6}-[0-9]{5,})(?:((\?|\/\?|#)[^/\s]*)|\/){0,1}$/;
export const esliteEventPathRegex = /^\/events\/([0-9a-zA-Z-]{3,})\/index\.html(?:((\?|\/\?|#)[^/\s]*)|\/){0,1}$/;

// events.eslite.com
export const eventsEsliteLinkRegex = /^https:\/\/events.eslite.com\/(?:coupon|2[0-9]{3})\/([0-9a-zA-Z-]{3,})\/index\.html(?:(\?|#)[^/\s]*){0,1}$/;
