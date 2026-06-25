$env:Path = "C:\Users\Azra.Karakus\Downloads\stitch_stitch_stock_tracking_app\node-portable\node-v20.20.2-win-x64;" + $env:Path
# Deploy the static project to production
.\node-portable\node-v20.20.2-win-x64\npx.cmd vercel --prod --yes
