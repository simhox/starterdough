//IMPL SHO create new file on every startup(possible?) (maybe via cron jobs?)


const fs = require('fs');
const chalk = require('chalk');
var path = require('path');
const fileLogger = {

    logRequestIps: (req) => {
        var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        
        
        if (ip !== "::1" && ip !== "::ffff:127.0.0.1" ) {


            fs.mkdir('/logs', { recursive: true }, (err) => {
                if (err) throw err;
              });

            console.log(chalk.red("someone is requesting the server"+ ip));
            var stream = fs.createWriteStream("logs/weblog.txt", {flags:'a'});
            stream.write("------------------------ \n");
            stream.write(new Date().toISOString() +"    IP:     ");
            stream.write(ip +"\n");
            stream.end();


        }

    }

};


module.exports = fileLogger;