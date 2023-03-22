use crate::lib::{self, structures::LogUsers};
use serde_json::{self, Value};
use std::fs::{self, ReadDir};

fn parse_files_to_object(server_jsons: ReadDir) {
    let mut state: LogUsers = lib::structures::LogUsers { users: vec![] };
    for file in server_jsons {
        let file_path = file.unwrap().path();
        let server_data = fs::read_to_string(file_path).expect("Unable to read file");
        let json: Value = serde_json::from_str(&server_data).unwrap();
        for user in json.as_object().unwrap() {
            let user_value_object = user.1.as_object().unwrap();
            let log_user = lib::structures::LogUser {
                id: user_value_object
                    .get("id")
                    .unwrap()
                    .to_string()
                    .parse()
                    .unwrap(),
                name: user_value_object
                    .get("name")
                    .unwrap()
                    .as_str()
                    .unwrap()
                    .to_string(),
                experience: user_value_object
                    .get("experience")
                    .unwrap()
                    .to_string()
                    .parse()
                    .unwrap(),
                level: user_value_object
                    .get("level")
                    .unwrap()
                    .to_string()
                    .parse()
                    .unwrap(),
            };
            state.users.push(log_user);
        }
        println!("{:#?}", state);
    }
}

pub fn parse_log(log_path: String) {
    let log_paths = fs::read_dir(log_path).unwrap();
    parse_files_to_object(log_paths);
}
