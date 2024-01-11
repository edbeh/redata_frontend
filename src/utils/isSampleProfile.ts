export const isSampleProfile = (email: string | undefined) => {
  if (!email) return;

  const regex = /sample.+@getredata.com/;
  return email.match(regex);
};
