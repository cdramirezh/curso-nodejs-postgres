FROM postgres:13

ENV POSTGRES_DB=my_store
ENV POSTGRES_USER=higiniecito
ENV POSTGRES_PASSWORD=admin123

EXPOSE 5432

CMD ["npm", "run", "start"]
