run-back :
	cd back && (npm i && npm audit && npm run dev)

run-front :
	cd front && (npm i && npm audit && npm run dev)

run :
	make run-back & make run-front
