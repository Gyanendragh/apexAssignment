#!C:\Perl64\bin\perl.exe -wT

print "Content-type : text/json\n\n";
use strict;
use CGI;
use DBI;
use JSON;

my $driver 		= "SQLite";
my $database 	= "appointment.db";
my $dsn 		= "DBI:$driver:dbname=$database";
my $userid 		= "";
my $password 	= "";

#DATABASE CONNECTION
my $dbh = DBI -> connect( $dsn, $userid, $password, { RaiseError=>1 } ) or die $DBI::errstr;

#SEARCH TEXT
my $cgi = new CGI;
my $txtSearch = $cgi->param('searchData') || '';
my $sql;
my $sth;
my @result;

if($txtSearch){
	$sql = qq(SELECT datetime,description FROM appointment WHERE description like ?);
	$sth = $dbh->prepare($sql);
	$sth->execute($txtSearch."%") or die $DBI::errstr;
	@result = $sth->fetchrow_hashref;
}else{
	$sql = qq(select datetime,description from appointment);
	$sth = $dbh->prepare($sql);
	$sth->execute() or die $DBI::errstr;
	while ( my $r = $sth->fetchrow_hashref ){
		push @result, $r;
	}
}

$dbh->disconnect();

#CONVERTING TO JSON
print to_json(\@result);



