export interface FlashMessage {
  status: string;
  mensagem: string;
}

export interface FlashMessageError {
  error: {
    status: string;
    mensagem: string;
  };
}
