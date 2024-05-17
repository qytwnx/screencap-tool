export default async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  switch (request.method) {
    case 'PUT': {
      return window.api.updateSettingById(data);
    }
    default:
      return {};
  }
};
