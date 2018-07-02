import LazyLoad from "../utils/lazy-load";

// const load = (path) => {
//   return
// }

export const Auth = {
	Login: LazyLoad(() =>
		import("../components/auth/login").then(module => module.default)
	),
	Register: LazyLoad(() =>
		import("../components/auth/login").then(module => module.default)
	)
};
