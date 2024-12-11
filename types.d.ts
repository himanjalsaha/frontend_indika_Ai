export interface VideoFile {
    _id: string;
    file_name: string;
    file_size: number;
    last_modified: string;
    link: string;
    metadata: {
      HTTPHeaders: {
        'content-type': string;
        date: string;
        server: string;
        'transfer-encoding': string;
        'x-amz-bucket-region': string;
        'x-amz-id-2': string;
        'x-amz-request-id': string;
      };
      HTTPStatusCode: number;
      HostId: string;
      RequestId: string;
      RetryAttempts: number;
    };
  }
  
  