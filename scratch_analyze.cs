using System;
using System.Drawing;

class Program {
    static void Main() {
        string srcPath = @"C:\Users\XYZ-Studio\.gemini\antigravity-ide\brain\b7c437f6-0cbd-44ca-a1d7-d16fcbefbd1f\hockey_404_real_1789728238548.jpg";
        using (Bitmap bmp = new Bitmap(srcPath)) {
            // Check boy shoes x=300 to 420, girl shoes x=610 to 730
            Console.WriteLine("--- Boy shoe (x=300) y=880 to 960 ---");
            for (int y = 880; y <= 960; y += 10) {
                Color c = bmp.GetPixel(300, y);
                Console.WriteLine(string.Format("x=300, y={0}: R={1}, G={2}, B={3}", y, c.R, c.G, c.B));
            }
            Console.WriteLine("--- Girl shoe (x=625) y=880 to 960 ---");
            for (int y = 880; y <= 960; y += 10) {
                Color c = bmp.GetPixel(625, y);
                Console.WriteLine(string.Format("x=625, y={0}: R={1}, G={2}, B={3}", y, c.R, c.G, c.B));
            }
        }
    }
}
