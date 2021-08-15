//import { readFileSync,writeFileSync } from 'fs';
export class Score {
    constructor(username) {
        //need change when we have a static server
        this.score_server_ip_set_csv = "http://localhost:8080/set_csv";
        this.score_server_ip_get_csv = "http://localhost:8080/get_csv";
        this.user_name = username;
        this.reset();
        console.log("TEST CSV");
        console.log(this.get_scores_csv());
    }
    reset() {
        this.curent_score = 100;
    }
    get_number_of_points() {
        return this.curent_score;
    }
    remove_points(points) {
        this.curent_score -= points;
    }
    add_points(points) {
        this.curent_score += points;
    }
    account_time_in_score(timer) {
        //300 sec (5 min) is the max you can take to finish before the score turn negative
        var number_of_secs = timer.getSeconds();
        this.curent_score -= (number_of_secs / 300) * 100;
    }
    get_best_score() {
        return this.get_best_score_server(); //since I can't figure out how the hll I need to import
    }
    //save the curent score to a json file
    //is no user is given it will just use 'anonymous'
    save_to_file() {
        /*
        try
        {
            var xmlHttp = new XMLHttpRequest();
            if(this.user_name)
            {
                var string_posted = "{\"username\":\""+this.user_name+"\",\"score\":\""+this.curent_score+"\"}"
            }
            else
            {
                var string_posted = "{\"username\":\"Anonymous\",\"score\":\""+this.curent_score+"\"}"
            }
            console.log(this.score_server_ip_set_csv);
            xmlHttp.open( "POST", this.score_server_ip_set_csv, false ); // false for synchronous request
            xmlHttp.send(string_posted);
        }
        catch(err)
        {
            console.log(err);
        }
        */
    }
    get_best_simple() {
        return "0.0\nServer down\n";
        /*
        try
        {
            var t0 = performance.now()
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", this.score_server_ip_get_csv, false ); // false for synchronous request
            xmlHttp.send( null );
            var t1 = performance.now()
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    
            return xmlHttp.responseText;
        }
        catch(err)
        {
            console.log(err);
            return "0,0\n0,Server not responding\n";
        }
        */
    }
    get_scores_csv() {
        try {
            var t0 = performance.now();
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", this.score_server_ip_get_csv, false); // false for synchronous request
            xmlHttp.send(null);
            var t1 = performance.now();
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
            return xmlHttp.responseText;
        }
        catch (err) {
            console.log(err);
            return "0,0\n0,Server not responding\n";
        }
    }
    get_best_score_server() {
        try {
            /*
            //spliting the csv to lines
            var line_array = this.get_scores_csv().split("\n");
            console.log("LINE ARRAY =");
            console.log(line_array);
            //removing the first eleemnt (csv header)
            line_array.shift();
            var max:number  = parseInt(line_array[0].split(",")[1]);
            var best_user:string = line_array[0].split(",")[0];
            for (let index = 0; index < line_array.length; index++)
            {
                var username = line_array[index].split(",")[0];
                var score = parseInt(line_array[index].split(",")[1]);

                if(max<score)
                {
                    max=score;
                    best_user=username;
                }
            }
            */
            var response = this.get_best_simple();
            var max = parseInt(response.split(",")[0]);
            var best_user = response.split(",")[1];
            return [max, best_user];
        }
        catch (err) {
            console.log(err);
            return [0, "Server not responding"];
        }
    }
}
