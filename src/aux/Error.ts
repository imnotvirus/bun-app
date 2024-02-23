class RequestError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Passa a mensagem para a classe Error
    this.statusCode = statusCode; // Adiciona um código de status
    this.name = "RequestError"; // Define o nome do erro
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default RequestError;