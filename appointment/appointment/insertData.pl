#!C:\Perl64\bin\perl.exe -wT

print "Content-type : text/json\n\n";
use strict;
use JSON;
use CGI;
use DBI;

my $driver 		= "SQLite";
my $database 	= "appointment.db";
my $dsn 		= "DBI:$driver:dbname=$database";
my $userid 		= "";
my $password 	= "";

#DATABASE CONNECTION
my $dbh = DBI -> connect( $dsn, $userid, $password, { RaiseError=>1 } ) or die $DBI::errstr;

my $cgi = new CGI;

#GET FORM PARAMETERS
my $appDate = $cgi->param('appDate') || '';
my $appTime = $cgi->param('appTime') || '';
my $appDescription = $cgi->param('appDescription') || '';


my $sql = qq( INSERT into appointment(datetime, description) values ( ?, ? ) );
my $sth = $dbh->prepare($sql);


#EXECUTE INSERT STATEMENT COMBINING DATE AND TIME
$sth->execute($appDate." ".$appTime, $appDescription) or die $DBI::errstr;

$dbh->disconnect();

#AUTO RE-DIRECT AFTER DATA ENTRY
my $url="http://localhost:8082/appointment/appointment.html";
my $t=0; # time until redirect activates
print "<META HTTP-EQUIV=refresh CONTENT=\"$t;URL=$url\">\n";