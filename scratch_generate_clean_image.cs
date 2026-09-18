using System;
using System.Drawing;
using System.Drawing.Imaging;

class Program {
    static void Main() {
        string srcPath = @"C:\Users\XYZ-Studio\.gemini\antigravity-ide\brain\b7c437f6-0cbd-44ca-a1d7-d16fcbefbd1f\hockey_404_real_1789728238548.jpg";
        string outPath = @"d:\wolverines\public\images\404-hockey-player.jpg";

        using (Bitmap src = new Bitmap(srcPath)) {
            int width = src.Width;
            int height = src.Height;

            using (Bitmap dest = new Bitmap(width, height, PixelFormat.Format32bppArgb)) {
                // Oval turf parameters
                double cx = 512.0;
                double cy = 890.0;
                double rx = 440.0;
                double ry = 125.0;
                double feather = 0.28;

                for (int y = 0; y < height; y++) {
                    for (int x = 0; x < width; x++) {
                        Color original = src.GetPixel(x, y);

                        // 1. Everything above y = 730 is completely untouched
                        if (y < 730) {
                            dest.SetPixel(x, y, original);
                            continue;
                        }

                        // 2. Check if pixel is part of the players, shoes, socks, sticks, ball:
                        // Player area is between x = 260 and x = 755, up to y = 948
                        bool isPlayer = false;
                        if (x >= 260 && x <= 755 && y <= 948) {
                            // Grass has G significantly higher than R and B
                            bool isGrass = (original.G > original.R + 12) && (original.G > original.B + 12) && (original.G > 60);
                            
                            // Check for turf white line between grass pixels
                            bool isTurfLine = (y >= 760 && y <= 778) && (original.R > 180 && original.G > 185 && original.B > 180);
                            // Only treat as turf line if NOT on girl's white socks (x=590..650 or 685..745) and not on ball (x=505..540, y=865..920)
                            if (isTurfLine) {
                                bool onWhiteSock = (x >= 590 && x <= 655) || (x >= 685 && x <= 748);
                                bool onBall = (x >= 505 && x <= 545 && y >= 865 && y <= 920);
                                if (!onWhiteSock && !onBall) {
                                    isGrass = true;
                                }
                            }

                            if (!isGrass) {
                                isPlayer = true;
                            }
                        }

                        if (isPlayer) {
                            // Keep player 100% solid & crisp
                            dest.SetPixel(x, y, original);
                            continue;
                        }

                        // 3. For grass and background below y = 730:
                        // Compute elliptical fade
                        double dx = (x - cx) / rx;
                        double dy = (y - cy) / ry;
                        double dist = Math.Sqrt(dx * dx + dy * dy);

                        double opacity = 1.0;
                        if (dist >= 1.0) {
                            opacity = 0.0;
                        } else if (dist > (1.0 - feather)) {
                            double t = (dist - (1.0 - feather)) / feather;
                            opacity = 0.5 * (1.0 + Math.Cos(t * Math.PI));
                        }

                        // Also fade out grass along the top horizon line (y < 790) when outside players
                        if (y < 790 && (x < 265 || x > 750)) {
                            double topT = (790.0 - y) / 40.0;
                            double topOp = 0.5 * (1.0 + Math.Cos(topT * Math.PI));
                            opacity = Math.Min(opacity, topOp);
                        }

                        // Extra soft fade at very bottom (y > 950)
                        if (y > 950) {
                            double bottomT = (y - 950.0) / (height - 950.0);
                            double bottomOp = 0.5 * (1.0 + Math.Cos(bottomT * Math.PI));
                            opacity = Math.Min(opacity, bottomOp);
                        }

                        // Blend with pure white
                        int r = (int)(original.R * opacity + 255 * (1.0 - opacity));
                        int g = (int)(original.G * opacity + 255 * (1.0 - opacity));
                        int b = (int)(original.B * opacity + 255 * (1.0 - opacity));

                        r = Math.Max(0, Math.Min(255, r));
                        g = Math.Max(0, Math.Min(255, g));
                        b = Math.Max(0, Math.Min(255, b));

                        dest.SetPixel(x, y, Color.FromArgb(255, r, g, b));
                    }
                }

                ImageCodecInfo jpgEncoder = null;
                foreach (ImageCodecInfo codec in ImageCodecInfo.GetImageEncoders()) {
                    if (codec.FormatID == ImageFormat.Jpeg.Guid) {
                        jpgEncoder = codec;
                        break;
                    }
                }
                EncoderParameters encParams = new EncoderParameters(1);
                encParams.Param[0] = new EncoderParameter(Encoder.Quality, 97L);

                dest.Save(outPath, jpgEncoder, encParams);
                Console.WriteLine("Perfected 404 image created successfully!");
            }
        }
    }
}
