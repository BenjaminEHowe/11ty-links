export async function onRequest(context) {
  const HONEYPOT_FIELD = "name";

  if (context.request.method !== "POST") {
    return new Response("Invalid request method", { status: 405 });
  }

  const formData = await context.request.formData();
  const fields = Object.fromEntries(formData.entries());
  fields.cf = context.request.cf;
  fields.headers = Object.fromEntries(context.request.headers.entries());
  if (fields[HONEYPOT_FIELD] === "") {
    delete fields[HONEYPOT_FIELD];
    const sent = await sendFormViaResend({
      apiKey: context.env.RESEND_KEY,
      emailFrom: context.env.EMAIL_FROM,
      emailTo: context.env.EMAIL_TO,
      fields,
      subject: `Form submission from ${new URL(context.request.url).hostname}`,
    });

    if (!sent) {
      return new Response("Oops! Something went wrong. Please try submitting the form again.", { status: 500 });
    }
  }
  return Response.redirect(context.request.headers.get("Referer"), 303);
}

async function sendFormViaResend({
  apiKey,
  emailFrom,
  emailTo,
  fields,
  subject,
}) {
  const send_response = await fetch(new Request("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom,
      to: emailTo,
      subject,
      text: formToText(fields),
    }),
  }));
  return send_response.ok;
}

function formToText(form) {
  var text = "";
  for (const property in form) {
    text += `${property}:\n`;
    var value = form[property];
    if (typeof value !== "string") {
      value = prettyJson(value);
    }
    text += `${value}\n\n`;
  }
  return text;
}

function prettyJson(json) {
  return JSON.stringify(json, null, 2);
}
