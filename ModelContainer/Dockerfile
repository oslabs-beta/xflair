FROM python:3.9.13

WORKDIR /model_container

COPY . /model_container/

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-setuptools \
    python3-venv \
    libgl1-mesa-dev \
    && apt-get clean

RUN pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN chmod +x /model_container/start/start.sh

RUN chmod +x /model_container/start/get_weights.py

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run server.py when the container launches
ENTRYPOINT ["/model_container/start/start.sh"]


