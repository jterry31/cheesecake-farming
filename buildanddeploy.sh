
### DEPLOY BUILD TO APACHE DOCUMENT ROOT

rm -rf build/
#npm run build
node --max-old-space-size=5096 `which npm` run build
read -p "Build OK??: "
rm -rf /var/www/html/polygon_backup_build/
mv /var/www/html/polygon_build/ /var/www/html/polygon_backup_build/
cp -r build/ /var/www/html/polygon_build/
cp .htaccess /var/www/html/polygon_build/

