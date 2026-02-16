import { useState, useRef } from 'react';
import { Camera, Mic, Video, X, Pause, StopCircle } from 'lucide-react';
import { Button } from './ui/button';
import { MediaFile } from '../utils/localStorage';

interface ZoneMultimediaProps {
  onMediaAdd: (media: MediaFile) => void;
  media: MediaFile[];
  onMediaRemove: (index: number) => void;
}

export function ZoneMultimedia({ onMediaAdd, media, onMediaRemove }: ZoneMultimediaProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        onMediaAdd({ type: 'photo', url, name: file.name });
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      onMediaAdd({ type: 'video', url, name: file.name });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        onMediaAdd({ 
          type: 'audio', 
          url, 
          name: `Récit oral ${new Date().toLocaleDateString('fr-FR')}.webm` 
        });
        stream.getTracks().forEach(track => track.stop());
        setRecordingTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Erreur d\'accès au microphone:', error);
      alert('Impossible d\'accéder au microphone. Veuillez autoriser l\'accès.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-[#87a878]/20">
      <h3 className="mb-4 text-[#5a5245]">Documentation multimédia</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {/* Photo Upload */}
        <button
          onClick={() => photoInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 bg-[#f9f7f5] hover:bg-[#87a878]/10 rounded-xl border-2 border-dashed border-[#87a878]/30 hover:border-[#87a878] transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-[#87a878]/10 group-hover:bg-[#87a878]/20 flex items-center justify-center transition-colors">
            <Camera className="w-8 h-8 text-[#87a878]" />
          </div>
          <span className="text-center text-[#5a5245]">
            Photo de la plante
          </span>
          <span className="text-xs text-[#717182]">JPG, PNG</span>
        </button>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* Audio Recording */}
        <div className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 bg-[#f9f7f5] rounded-xl border-2 border-dashed border-[#c1664f]/30">
          <div className="w-16 h-16 rounded-full bg-[#c1664f]/10 flex items-center justify-center">
            <Mic className="w-8 h-8 text-[#c1664f]" />
          </div>
          <span className="text-center text-[#5a5245]">
            Récit oral
          </span>
          
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="bg-[#c1664f] hover:bg-[#c1664f]/90 text-white px-6"
            >
              Enregistrer
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#c1664f] mb-2">
                <div className="w-2 h-2 rounded-full bg-[#c1664f] animate-pulse" />
                <span>{formatTime(recordingTime)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={pauseRecording}
                  size="sm"
                  variant="outline"
                  className="border-[#c1664f] text-[#c1664f]"
                >
                  {isPaused ? <Mic className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={stopRecording}
                  size="sm"
                  className="bg-[#c1664f] hover:bg-[#c1664f]/90 text-white"
                >
                  <StopCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <button
          onClick={() => videoInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 bg-[#f9f7f5] hover:bg-[#d4a574]/10 rounded-xl border-2 border-dashed border-[#d4a574]/30 hover:border-[#d4a574] transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-[#d4a574]/10 group-hover:bg-[#d4a574]/20 flex items-center justify-center transition-colors">
            <Video className="w-8 h-8 text-[#d4a574]" />
          </div>
          <span className="text-center text-[#5a5245]">
            Gestes de préparation
          </span>
          <span className="text-xs text-[#717182]">MP4, MOV</span>
        </button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>

      {/* Media Preview */}
      {media.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm text-[#5a5245] mb-2">Fichiers ajoutés :</h4>
          <div className="grid grid-cols-1 gap-2">
            {media.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#f9f7f5] rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {item.type === 'photo' && <Camera className="w-5 h-5 text-[#87a878] flex-shrink-0" />}
                  {item.type === 'audio' && <Mic className="w-5 h-5 text-[#c1664f] flex-shrink-0" />}
                  {item.type === 'video' && <Video className="w-5 h-5 text-[#d4a574] flex-shrink-0" />}
                  <span className="text-sm text-[#5a5245] truncate">{item.name}</span>
                </div>
                <button
                  onClick={() => onMediaRemove(index)}
                  className="p-1 hover:bg-[#d4183d]/10 rounded-md transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-[#d4183d]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}