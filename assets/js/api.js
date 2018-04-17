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


    new_task(e, token, form) {
        e.preventDefault();

        let creator_id = token.user_id;
        let title = form.title;
        let body = form.body;
        let user_id = $("select[name=user]").val();

        let text = {
            task: {
                body: body,
                title: title,
                user_id: user_id,
                creator_id: creator_id,
            },
            token: token.token,
        };


        let empty_task = {
            title: "",
            body: "",
        };

        let host = window.location.host;

        $.ajax(task_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: () => {
                store.dispatch({
                    type: "CLEAN_TASKFORM",
                });
                store.dispatch({
                    type: "REDIRECT",
                });
                store.dispatch({
                    type: "NOREDIRECT",
                });
            }
        });
    }

    get_user() {
        $.ajax(user_path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "GET_USER",
                    users: resp.data,
                });
            }
        });
    }

    get_tasks() {
        $.ajax(task_path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "GET_TASKS",
                    tasks: resp.data,
                });
            }
        });
    }

    delete_task(id, token) {
        let path = task_path+"/"+id+"|"+token;

        $.ajax(path, {
            method: "delete",
            success: () => {
                this.get_tasks();
            }
        });
    }

    save_edit_task(task) {
        store.dispatch({
            type: "SAVE",
            task: task,
        });
    }

    edit_task(e, token, id, type) {
        e.preventDefault();

        let text = {};

        let mins = $("#mins").val();
        let hours = $("#hours").val();
        let complete = false;

        if($("#complete").is(":checked")) {
            complete = true;
        }

        if (type == "creator") {
            let user_id = $("#user_id").val();
            let title = $("#title").val();
            let body = $("#body").val();

            let task = {
                user_id: user_id,
                title: title,
                body: body,
                mins: mins,
                hours: hours,
                complete: complete,
            };
            text["task"] = task;
        } else {
            let task = {
                mins: mins,
                hours: hours,
                complete: complete,
            };
            text["task"] = task;
        }

        $.ajax(task_path+"/"+id, {
            type: "patch",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: () => {
                store.dispatch({
                    type: "REDIRECT",
                });
                store.dispatch({
                    type: "NOREDIRECT",
                });
            }
        });

    }
}

export default new API();
