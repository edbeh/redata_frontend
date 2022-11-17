export const navigateToSubdomain = (
  subdomain: "app" | null,
  destination: string
) => {
  const isLocalHost = window.location.host.includes("localhost");

  if (isLocalHost)
    return `http://${subdomain ? subdomain + "." : ""}${
      window.location.host
    }${destination}`;

  return `https://${subdomain ? subdomain + "." : ""}${
    window.location.host
  }${destination}`;
};
