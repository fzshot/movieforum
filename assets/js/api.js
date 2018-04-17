import store from "./store";

class API {
    create_user(e, users){
        e.preventDefault();

        store.dispatch({
            type: "REMOVE_DUP",
        });

        let email = $("#email").val();
        let name = $("#name").val();
        let pass = $("#password").val();


        let text = JSON.stringify({
            user: {
                email: email,
                name: name,
                password_hash: pass,
            }
        });


        $.ajax(user_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: () => {
                store.dispatch({
                    type: "REDIRECT",
                });
                store.dispatch({
                    type: "NOREDIRECT",
                });
            },
            error: (resp) => {
                let error = JSON.parse(resp.responseText);
                let errortext = "email "+error.errors.email[0];
                store.dispatch({
                    type: "DUP_EMAIL",
                    newuser_dup: {
                        boolean: true,
                        text: errortext,
                    }
                });
            }
        });
    }

    submit_login(e) {
        e.preventDefault();

        store.dispatch({
            type: "LOGIN_OK",
        });

        let email = $("#email").val();
        let pass = $("#password").val();

        let text = {
            email: email,
            pass: pass,
        };

        $.ajax(token_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: (resp) => {
                store.dispatch({
                    type: "LOGIN_OK",
                });
                store.dispatch({
                    type: "SET_TOKEN",
                    token: resp,
                });
            },
            error: () => {
                store.dispatch({
                    type: "LOGIN_ERROR",
                });
            }
        });
    }

    get_total_page() {
        let path = post_path+"/stats/posts_number";

        $.ajax(path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "SET_TOTAL_PAGE",
                    num: resp.number,
                });
            }
        });
    }

    get_posts_by_page(num) {
        let path = post_path+"/recent_replyed_post/page/"+num;

        $.ajax(path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "GET_POSTS",
                    posts: resp.data,
                });
            }
        });
    }

}

export default new API();
