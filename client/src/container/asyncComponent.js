import LazyLoad from "../utils/lazy-load";

// const load = (path) => {
//   return
// }

export const Auth = {
	Login: LazyLoad(() =>
		import("../components/auth/login").then(module => module.default)
	),
	Register: LazyLoad(() =>
		import("../components/auth/register").then(module => module.default)
	)
};


export const User = {
	Profile: LazyLoad(() =>
		import("../components/UserProfile").then(module => module.default)
	)
}

export const Products = {
	Products: LazyLoad(() =>
		import('../components/Products').then(module => module.default)
	)
}

export const Admin = {
	AddProduct: LazyLoad(() =>
		import("../components/admin/AddAProduct.js").then(module => module.default)
	)
}
