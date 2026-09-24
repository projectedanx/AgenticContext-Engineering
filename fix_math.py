with open("services/latticeBreaker.ts", "r") as f:
    content = f.read()

# Fix the normalization issue where the score doesn't reach 0.8
# The current math gives max distance of sqrt(5 * 0.8^2) = sqrt(5 * 0.64) = 1.78
# 1.78 / sqrt(5) = 0.8
# Wait, for vAction components at 0.9 and baseline at 0.1, the difference is 0.8.
# sum of squares = 5 * (0.8)^2 = 3.2
# distance = sqrt(3.2) = 1.7888
# normalizedScore = 1.7888 / sqrt(5) = 1.7888 / 2.236 = 0.8

content = content.replace("const normalizedScore = Math.min(distance / Math.sqrt(5), 1.0);", "const normalizedScore = Math.min(distance / (Math.sqrt(5) * 0.8), 1.0);")

with open("services/latticeBreaker.ts", "w") as f:
    f.write(content)
