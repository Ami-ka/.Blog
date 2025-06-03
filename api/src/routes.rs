use axum::{Router, routing::get};

use crate::handlers::get_user;

pub fn init_router() -> Router {
    Router::new()
        .route("/user", get(get_user))
        .route("", method_router);
}
