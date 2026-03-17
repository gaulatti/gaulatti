import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("engineering", "routes/engineering.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("sanremo", "routes/sanremo.tsx"),
  route("journey", "routes/journey.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
