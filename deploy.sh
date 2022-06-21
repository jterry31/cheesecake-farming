### DEPLOY BUILD TO APACHE DOCUMENT ROOT

rm -rf /var/www/html/polygon_backup_build/
mv /var/www/html/polygon_build/ /var/www/html/polygon_backup_build/
cp -r build/ /var/www/html/polygon_build/
cp .htaccess /var/www/html/polygon_build/

