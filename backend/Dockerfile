FROM node:20-alpine
WORKDIR /app

# 1. Copy package files first for caching
COPY package.json package-lock.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy ONLY necessary files (adjusted paths)
COPY tsconfig.json ./
COPY src ./src 

# 4. Start command
CMD ["npm", "start"]