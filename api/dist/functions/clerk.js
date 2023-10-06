var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var clerk_exports = {};
__export(clerk_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(clerk_exports);
var import_slice = __toESM(require("@babel/runtime-corejs3/core-js/instance/slice"));
var import_stringify = __toESM(require("@babel/runtime-corejs3/core-js/json/stringify"));
var import_webhooks = require("@redwoodjs/api/webhooks");
const handler = async (event) => {
  try {
    var _context;
    const options = {
      signatureHeader: "svix-signature",
      signatureTransformer: (signature) => {
        const passedSignatures = signature.split(" ");
        for (const versionedSignature of passedSignatures) {
          const [version, signature2] = versionedSignature.split(",");
          if (version === "v1") {
            return signature2;
          }
        }
      }
    };
    const svix_id = event.headers["svix-id"];
    const svix_timestamp = event.headers["svix-timestamp"];
    const payload = `${svix_id}.${svix_timestamp}.${event.body}`;
    (0, import_webhooks.verifyEvent)("base64Sha256Verifier", {
      event,
      secret: (0, import_slice.default)(_context = process.env.CLERK_WH_SECRET).call(_context, 6),
      payload,
      options
    });
    const parsedPayload = JSON.parse(event.body);
    const data = parsedPayload?.data;
    const firstName = data?.first_name;
    const lastName = data?.last_name;
    const emailAddress = data?.email_addresses?.[0]?.email_address;
    const cellPhone = data?.phone_numbers?.[0]?.phone_number;
    const imageUrl = data?.image_url;
    const clerkUserId = data?.id;
    const dataForRequest = {
      firstName,
      lastName,
      emailAddress,
      cellPhone,
      imageUrl,
      clerkUserId
    };
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      body: (0, import_stringify.default)({
        data: dataForRequest
      })
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=clerk.js.map
