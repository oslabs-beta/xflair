FROM python:latest

WORKDIR /TensorBoard

COPY . /TensorBoard/

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-setuptools \
    libgl1-mesa-dev \
    libhdf5-dev \ 
    && apt-get clean

RUN pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

RUN chmod +x /TensorBoard/start/start.sh

RUN chmod +x /TensorBoard/start/get_weights.py

# Make port 5000 available to the world outside this container
EXPOSE 5000

EXPOSE 6006

# Run server.py when the container launches
ENTRYPOINT ["/TensorBoard/start/start.sh"]


