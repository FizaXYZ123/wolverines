Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("C:\Users\XYZ-Studio\.gemini\antigravity-ide\brain\b7c437f6-0cbd-44ca-a1d7-d16fcbefbd1f\hockey_404_real_1789728238548.jpg")
Write-Host "Real image size: $($src.Width) x $($src.Height)"

# Check pixels at bottom to see where grass starts and ends
# Bottom line is y = 1023
$pBottom = $src.GetPixel(512, 1023)
Write-Host "Bottom pixel at 512,1023: R=$($pBottom.R) G=$($pBottom.G) B=$($pBottom.B)"

# Check shoe bottom: around y = 880-940
$src.Dispose()
