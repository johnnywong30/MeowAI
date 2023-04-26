FROM python:3.9

COPY requirements.txt .
COPY app.py . 
RUN pip install -r requirements.txt
ENV FLASK_ENV production

EXPOSE 8000
CMD ["python", "app.py"]